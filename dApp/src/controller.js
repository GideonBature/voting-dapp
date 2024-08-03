import { pollStorage } from './storage/poll';
import { Poll } from './model/poll';

export const controller = {
    createPoll: async (data) => {
        const { creator, question, options } = data;
        const poll = new Poll({ creator, question, options });
        pollStorage.addOne(poll);
        return { status: 'accept', data: poll.getData() };
    },
    castVote: async (data) => {
        const { pollId, voterId, option } = data;
        const poll = pollStorage.getOneById(pollId);
        if (!poll) {
            throw { error: 'Poll not found.' };
        }
        poll.addVote(voterId, option);
        pollStorage.updateOne(poll);
        return { status: 'accept', data: poll.getData() };
    },
    getPollResults: async (data) => {
        const { pollId } = data;
        const poll = pollStorage.getOneById(pollId);
        if (!poll) {
            throw { error: 'Poll not found.' };
        }
        return { status: 'accept', data: poll.getData() };
    }
};
