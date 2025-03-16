'use client'

import { LikeUser } from "@/features/comments/api/comments.types";
import { Input } from "@/shared/ui/Input/Input";
import { ModalRadix } from "@/shared/ui/Modal/ModalRadix";
import s from './LikeModal.module.scss'
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";


type LikeModalType = {
    isOpen: boolean
    onClose: ()=> void
    likes: LikeUser[]
}

const LikeModal = ({ isOpen, onClose, likes}: LikeModalType) => {
 const [searchTerm, setSearchTerm] = useState('')

 const filteredLikes = likes.filter((user)=> 
  user.userName.toLowerCase().includes(searchTerm.toLowerCase()) 
)

  return (
    <div>
    <ModalRadix modalTitle="Likes" size="lg" open={isOpen} onClose={onClose}>
     <Input variant="search" className={s.input} value={searchTerm} onChange={(e)=> setSearchTerm(e.currentTarget.value)}/>
     {filteredLikes.map((user)=> (
      <div key={user.id} className={s.users}>
        <div className={s.user}>
          <div className={s.avatarNameContainer}>
        {user.avatars.length > 0 ? (
        <img src={user.avatars[0].url} alt={user.userName} className={s.avatar}/>) : (<div className={s.avatar}></div>)} 
         {user.userName} 
         </div>
        <Button className={s.button}>
          {user.isFollowedBy ? "Unfollow" : "Follow"} 
          </Button>
        </div>
      </div>
     ))}
     </ModalRadix>
    </div>
  );
};

export default LikeModal;
