import profileReducer, { addPost, deletePost } from "./profile-reducer";


test('length of posts should be incremented', () => {
    // 1. Test data
    let action = addPost("test text");
    let state = {
        posts: [
            {
                id: 1,
                text: "It was a long day, but I'm happy to announce that I've got a job!",
                likes: 235
            },
            {
                id: 2, 
                text: "What about an interview?", 
                likes: 233
            }
        ]
    };
    
    // 2. Action
    let newState = profileReducer(state, action);
    
    // 3. expectation
    expect(newState.posts.length).toBe(3);
});
  

test('new text message should be correct', () => {
    // 1. Test data
    let action = addPost("test text");
    let state = {
        posts: [
            {
                id: 1,
                text: "It was a long day, but I'm happy to announce that I've got a job!",
                likes: 235
            },
            {
                id: 2, 
                text: "What about an interview?", 
                likes: 233
            }
        ]
    };
    
    // 2. Action
    let newState = profileReducer(state, action);
    
    // 3. expectation
    expect(newState.posts[2].text).toBe("test text");
});
  
test('posts arr lenght should decrement after an item is deleted', () => {
    // 1. Test data
    let action = deletePost(1);
    let state = {
        posts: [
            {
                id: 1,
                text: "It was a long day, but I'm happy to announce that I've got a job!",
                likes: 235
            },
            {
                id: 2, 
                text: "What about an interview?", 
                likes: 233
            }
        ]
    };
    
    // 2. Action
    let newState = profileReducer(state, action);
    
    // 3. expectation
    expect(newState.posts.length).toBe(1);
});
  
  
test('posts arr length should not change if id is incorrect', () => {
    // 1. Test data
    let action = deletePost(5);
    let state = {
        posts: [
            {
                id: 1,
                text: "It was a long day, but I'm happy to announce that I've got a job!",
                likes: 235
            },
            {
                id: 2, 
                text: "What about an interview?", 
                likes: 233
            }
        ]
    };
    
    // 2. Action
    let newState = profileReducer(state, action);
    
    // 3. expectation
    expect(newState.posts.length).toBe(2);
});
  
