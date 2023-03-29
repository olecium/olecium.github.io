let initialState =  {
    nav: [
        {id: 1, title: "Messages", link: "/messages"},
        {id: 2, title: "Users", link: "/users"},
        {id: 3, title: "News", link: "/news"},
        {id: 4, title: "Music", link: "/music"}
    ],
    friendList: [
        {id: 1, name: 'Vasya', surname: 'Pupkin'},
        {id: 2, name: 'Kate', surname: 'Milkin'},
        {id: 3, name: 'Lola', surname: 'Judren'},
        {id: 5, name: 'Mira', surname: 'Numk'},
        {id: 6, name: 'Valery', surname: 'Binky'}
    ]
};

const sidebarReducer = ( state = initialState, action) => {
    return state;
}

export default sidebarReducer;