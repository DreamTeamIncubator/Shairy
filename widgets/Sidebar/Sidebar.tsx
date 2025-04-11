'use client'
import s from './Sidebar.module.scss'
import {usePathname} from 'next/navigation'
import {SidebarItem} from '@/widgets/Sidebar/model/SidebarItem'
import Link from 'next/link'
import {useGetMeQuery} from '@/features/auth/api/auth'
import {formatPathForURL} from '@/shared/lib/formatPath'
import style from './model/SidebarItem.module.scss'
import {useState} from 'react';
import CreatePost from '@/features/posts/ui/CreatePost/CreatePost';
import {CreatePostModal} from '@/features/posts/ui/CreatePostModal/CreatePostModal';

export const sidebarItems = {
    top: ['home', 'create', 'my-profile', 'messenger', 'search'],
    main: ['statistics', 'favorites'],
    footer: ['log-out'],
}

type SidebarProps = {
    elements: typeof sidebarItems
}
export const Sidebar = ({elements}: SidebarProps) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(1); // Текущий шаг

    const steps = ['Add photo', 'Cropping', 'Filters', 'Publish']; // Заголовки для каждого шага

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setCurrentStep(1); // Сбрасываем шаг при открытии модалки
    };

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length)); // Переход к следующему шагу
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1)); // Переход к предыдущему шагу
    };


    const {data} = useGetMeQuery()
    const pathname = usePathname()

    if (!data) {
        return null
    }

    const mappedTopElements = elements?.top.map((item, index) => {
        const itemPath = formatPathForURL(item)
        const isActive = pathname === `/${itemPath}`
        if (item === 'my-profile') {
            return (
                <li className={style.item} key={index}>
                    <Link
                        href={`/my-profile/${data?.userId}`}
                        className={`${style.link} ${isActive ? s.active : ''}`}>
                        <div
                            className={style.icon}
                            style={{maskImage: `url(/icons/sidebarIcons/my-profile.svg)`}}
                        />
                        <span>My Profile</span>
                    </Link>
                </li>
            )
        } else if (item === 'create') {
            return (
                <li className={style.item} key={index}>
                    <Link
                        href={`/my-profile/${data?.userId}`}
                        className={`${style.link} ${isActive ? s.active : ''}`}>
                        <div
                            className={style.icon}
                            style={{maskImage: `url(/icons/sidebarIcons/create.svg)`}}
                        />
                        <span onClick={handleOpenModal}>Create</span>
                    </Link>
                </li>
            );
        } else {
            return <SidebarItem key={index} item={item} pathname={pathname}/>
        }
    })

    return (
        <>
            <nav className={s.sidebar}>
                <ul className={`${s.list} ${s.top}`}>{mappedTopElements}</ul>
                <ul className={`${s.list} ${s.main}`}>
                    {elements?.main.map((item, index) => (
                        <SidebarItem key={index} item={item} pathname={pathname}/>
                    ))}
                </ul>
                <ul className={s.list}>
                    {elements?.footer.map((item, index) => (
                        <SidebarItem key={index} item={item} pathname={pathname}/>
                    ))}
                </ul>
            </nav>
            {/* Модальное окно */}
            <CreatePostModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={steps[currentStep - 1]} // Динамический заголовок
                hideCloseButton={currentStep > 1} // Скрываем кнопку закрытия на всех шагах, кроме первого
                onNext={handleNext}
                onPrev={handlePrev}
                currentStep={currentStep} // Передаем текущий шаг
            >
                <CreatePost
                    endCursorPostId={null}
                    currentStep={currentStep} // Передаем текущий шаг
                    onClose={() => setIsModalOpen(false)}
                    onStepChange={setCurrentStep} // Передаем функцию изменения шага
                />
            </CreatePostModal>
        </>
    )
}
