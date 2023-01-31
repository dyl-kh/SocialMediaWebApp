import { v4 as uuid } from 'uuid';

// function to add dummy data to local storage for demo purposes
const loadDummyPosts = () => {
    const USER_ID = 'f6e28f86-2190-4623-8557-abd9abfa43c2';
    const POST_ID = uuid();
    const REPLY_ID = uuid();
    const posts = [
        {
            postID: POST_ID,
            postAuthorID: USER_ID,
            postText:
                'Hi team, I followed the tutorial on the website and I am having trouble with the last step. I am getting an error when I try to run the app. Can someone help me?',
            postDate: '13 April at 12:32 PM',
            postImg:
                'https://firebasestorage.googleapis.com/v0/b/further-web-programming.appspot.com/o/images%2F90a9e289-2d8b-4e21-8bde-a6be3d6cdda7?alt=media&token=62487b04-1729-4edb-a2bc-d7236536e34d',
            postEditDate: '13 April at 1:09 PM',
        },
        {
            postID: uuid(),
            postAuthorID: '2d1b207b-41c9-4f5e-aa69-1244ef6b88ec',
            postText:
                'Hi team, the report from the last meeting is missing from the shared drive. Can someone please upload it?',
            postDate: '15 April at 11:02 AM',
            postImg: 'null',
            postEditDate: 'null',
        },
    ];
    const replies = [
        {
            replyID: REPLY_ID,
            parentID: POST_ID,
            replyAuthorID: '2d1b207b-41c9-4f5e-aa69-1244ef6b88ec',
            replyDate: '13 April at 2:31 PM',
            replyImg:
                'https://firebasestorage.googleapis.com/v0/b/further-web-programming.appspot.com/o/images%2F8d06786b-a744-44d1-8e22-4a4fb3844be8?alt=media&token=9c26a09f-2536-45fa-8e61-c0bbaf5fa60c',
            replyText:
                'Hi there, have you tried running the app in incognito mode? That usually fixes the issue.',
        },
        {
            replyID: uuid(),
            parentID: POST_ID,
            replyAuthorID: USER_ID,
            replyImg: 'null',
            replyDate: '14 April at 1:45 PM',
            replyText:
                'I managed to fix the issue. I had to delete the node_modules folder and run the app on incognito mode. Thanks for your help!',
        },
        {
            replyID: uuid(),
            parentID: REPLY_ID,
            replyAuthorID: '2d1b207b-41c9-4f5e-aa69-1244ef6b88ec',
            replyImg: 'null',
            replyDate: '13 April at 2:33 PM',
            replyText:
                'Also make sure you have the latest version of chrome installed.',
        },
    ];

    const users = [
        {
            email: 'dylan@email.com',
            fullname: 'Dylan Khan',
            id: 'f6e28f86-2190-4623-8557-abd9abfa43c2',
            joinDate: '23/08/2022',
            password: 'ASDFASDFJKL;1234',
        },
        {
            email: 'Codi@gmail.com',
            fullname: 'Codi Emery',
            id: '2d1b207b-41c9-4f5e-aa69-1244ef6b88ec',
            joinDate: '23/08/2022',
            password: 'ASDFASDFJKL;1234',
        },
        {
            email: 'test@email.com',
            fullname: 'Tester Acc',
            id: '9999-TESTID-9999',
            joinDate: '01/01/2022',
            password: 'test',
        },
    ];

    const postsJSON = JSON.stringify(posts);
    const repliesJSON = JSON.stringify(replies);
    const usersJSON = JSON.stringify(users);

    localStorage.setItem('posts', postsJSON);
    localStorage.setItem('replies', repliesJSON);
    localStorage.setItem('users', usersJSON);
};

export default loadDummyPosts;
