'use client';

import React, { useEffect, useState } from 'react';
import s from './Search.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { useGetUsersQuery } from '@/features/users/api/users';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';
import Link from 'next/link';

type RecentUser = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

const RECENT_KEY = 'recent-users';

const Search = () => {
  const [search, setSearch] = useState('');
  const [recent, setRecent] = useState<RecentUser[]>([]);
  const debouncedSearch = useDebounce(search, 400);

  const { data: users } = useGetUsersQuery(
    { search: debouncedSearch },
    { skip: !debouncedSearch }
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const saveToRecent = (user: RecentUser) => {
    const prev = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') as RecentUser[];
    const updated = [user, ...prev.filter(u => u.userName !== user.userName)].slice(0, 10);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setRecent(updated);
  };

  const handleRemoveRecentSearch = (id: number) => {
    const updated = recent.filter(user => user.id !== id)
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
    setRecent(updated)
  }

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) {
      setRecent(JSON.parse(stored));
    }
  }, []);

  const renderUser = (user: RecentUser) => (
    <div key={user.id} className={s.userContainer}>
      <Image src={'/close.svg'} alt="close" width={12} height={12} onClick={() => { handleRemoveRecentSearch(user.id) }} />
      <div className={s.user} >
        {user.avatarUrl ? (
          <Image src={user.avatarUrl} alt="avatar" width={48} height={48} className={s.avatar} />
        ) : (
          <div className={s.avatar}></div>
        )}
        <div className={s.namesContainer}>
          <Link href={`/public-profile/${user.id}`} onClick={() => saveToRecent(user)}>
            <span className={s.userName}>{user.userName}</span>
          </Link>
          <div className={s.names}>
            <span className={s.name}>{user.firstName}</span>
            <span className={s.name}>{user.lastName}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={s.page}>
      <div className={s.inputWrapper}>
        <span className={s.searchText}>Search</span>
        <Input
          value={search}
          onChange={handleOnChange}
          variant="search"
          placeholder="Search"
        />
      </div>

      <div className={s.userList}>
        {search === '' ? (
          <>
            <h3 className={s.recentTitle}>Recent requests</h3>
            {recent.length > 0 ? (
              recent.map(renderUser)
            ) : (
              <div className={s.emptyWrapper}>
                <p className={s.empty}>
                  Oops! This place looks empty!
                  </p>
                  <p className={s.smallText}>
                  No recent requests
                </p>
              </div>
            )}
          </>
        ) : (
          users?.items.map(user =>
            renderUser({
              id: user.id,
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              avatarUrl: user.avatars?.[0]?.url,
            })
          )
        )}
      </div>
    </div>
  );
};

export default Search;
