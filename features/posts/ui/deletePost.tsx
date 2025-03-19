// 'use client'
//
// import s from './deletePost.module.scss'
// import React, {useState} from 'react';
// import { useDeleteUserPostMutation, useGetpostQuery} from '@/features/posts/api/posts';
// import {ModalRadix} from '@/shared/ui/Modal/ModalRadix';
// import {Button} from '@/shared/ui/Button/Button';
//
// const DeletePost = () => {
//
//     //TODO: delete useGetpostQuery. it's here only for test
//     const {data} =  useGetpostQuery(1)
//
//     const [isOpen, setIsOpen] = useState<boolean>(false)
//
//     const [deletePost] = useDeleteUserPostMutation()
//
//     const deletePostHandler = async  ()=>{
//         setIsOpen(true)
//         try{
//             //TODO: write instead of '1' postId
//             await  deletePost('1').unwrap()
//             setIsOpen(false)
//         }
//         catch (err) {
//             console.log(err)
//             //TODO: добавить всплывающее внизу окощко об ошибке
//             setIsOpen(false)
//         }
//
//     }
//
//     return (
//         <div>
//             <img src={data?.avatarOwner} alt={'avatar'}/>
//             <button onClick={()=>setIsOpen(true)}>Delete</button>
//             <ModalRadix open={isOpen} onClose={() => setIsOpen(false)} modalTitle={'Delete Post'}>
//                 <p className={s.text}>Are you sure you want to delete this post?</p>
//                 <div className={s.wrapper}>
//                     <Button variant={'outlined'} onClick={deletePostHandler}>Yes</Button>
//                     <Button variant={'primary'} onClick={() => setIsOpen(false)}>No</Button>
//                 </div>
//             </ModalRadix>
//         </div>
//
//     );
// };
//
// export default DeletePost;