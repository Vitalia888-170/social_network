import mainReducer, { actions } from './post-reducer';


let state;
beforeEach(() => {
	state = {
		posts: [
			{ id: 1, message: 'Hey, how are you?' },
			{ id: 2, message: 'Penelope, where are you now? I miss you so much!!!' },
			{ id: 3, message: 'Did you finish last projects? Can you tell me how you did it so quickly?' },
			{ id: 4, message: 'Dear, I will wait for you and Melisa in my birthday party' }
		]
	}
})

test('post length should be incremented', () => {
	let newState = mainReducer(state, actions.addPost("Great job!"));
	expect(newState.posts.length).toBe(5);

});

test('post length should be decremented', () => {

	let newState = mainReducer(state, actions.deletePost(1));

	expect(newState.posts.length).toBe(3);

});



