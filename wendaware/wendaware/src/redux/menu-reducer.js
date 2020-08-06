let initialState = {
    nav: [
        { id: 1, title: "About Us", link: './about-us'},
        { id: 3, title: "Get In Touch", link: './contact-us'},
        { id: 4, title: "News", link: './news'},
    ]
};
const MenuReducer = (state = initialState, action) => {
    return state;
}
export default MenuReducer;
