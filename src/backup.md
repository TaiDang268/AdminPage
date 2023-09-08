addPost: (state, action: PayloadAction<IPosts>) => {
state.posts.push(action.payload)
},
editPost: (state, action: PayloadAction<IPosts>) => {
const editedPostIndex = state.posts.findIndex((post) => post.id === action.payload.id)
if (editedPostIndex !== -1) {
state.posts[editedPostIndex] = action.payload
}
},
