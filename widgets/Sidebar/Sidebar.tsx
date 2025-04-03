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
import {ModalRadix} from '@/shared/ui/Modal/ModalRadix';
import LogOutForm from '@/features/auth/ui/logOutFom/LogOutForm';
import {useBoolean} from '@/hooks/useBoolean';

export const sidebarItems = {
    top: ['home', 'create', 'my-profile', 'messenger', 'search'],
    main: ['statistics', 'favorites'],
    footer: ['log-out'],
}

type SidebarProps = {
    elements: typeof sidebarItems
}
export const Sidebar = ({elements}: SidebarProps) => {
    const {value, setTrue, setFalse} = useBoolean()
    const {value: isModalOpen, setTrue: setModalOpen, setFalse: setModalClosed} = useBoolean();

    const [currentStep, setCurrentStep] = useState<number>(1); // Текущий шаг

    const steps = ['Add photo', 'Cropping', 'Filters', 'Publish']; // Заголовки для каждого шага

    const handleOpenModal = () => {
        setModalOpen()
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
                <li className={style.item} key={index} onClick={handleOpenModal}>
                    <Link
                        href={`/my-profile/${data?.userId}`}
                        className={`${style.link} ${isActive ? s.active : ''}`}>
                        <div
                            className={style.icon}
                            style={{maskImage: `url(/icons/sidebarIcons/create.svg)`}}
                        />
                        <span>Create</span>
                    </Link>
                </li>
            );
        } else {
            return <SidebarItem key={index} item={item} pathname={pathname}/>
        }
    })

    const mappedFooterElements = elements?.footer.map((item, index) => {
        const itemPath = formatPathForURL(item)
        const isActive = pathname === `/${itemPath}`
        return (
            <li className={style.item} key={index} onClick={setTrue}>
                <div className={`${style.link} ${isActive ? s.active : ''}`}>
                    <div
                        className={style.icon}
                        style={{maskImage: `url(/icons/sidebarIcons/log-out.svg)`}}
                    />
                    <span>Log Out</span>
                </div>

            </li>
        )
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
                    {mappedFooterElements}
                </ul>
            </nav>


            {/* Модальное окно */}
            <CreatePostModal
                open={isModalOpen}
                onClose={setModalClosed}
                title={steps[currentStep - 1]} // Динамический заголовок
                hideCloseButton={currentStep > 1} // Скрываем кнопку закрытия на всех шагах, кроме первого
                onNext={handleNext}
                onPrev={handlePrev}
                currentStep={currentStep} // Передаем текущий шаг
            >
                <CreatePost
                    currentStep={currentStep} // Передаем текущий шаг
                    onClose={setModalClosed}
                    onStepChange={setCurrentStep} // Передаем функцию изменения шага
                />
            </CreatePostModal>

            {/*Modal Log-out*/}
            <ModalRadix modalTitle={'Log Out'} open={value} onClose={setFalse}>
                <LogOutForm setFalse={setFalse}/>
            </ModalRadix>
        </>
    )
}
