import crypto from 'node:crypto';

export class Poll {
    id;
    creator;
    createdAt;
    question;
    options;
    votes;

    constructor({ creator, question, options }) {
        this.id = crypto.randomUUID();
        this.creator = creator;
        this.createdAt = Date.now();
        this.question = question;
        this.options = options;
        this.votes = new Map();
    }

    getData() {
        return {
            id: this.id,
            creator: this.creator,
            createdAt: this.createdAt,
            question: this.question,
            options: this.options,
            votes: Array.from(this.votes.entries())
        };
    }

    addVote(voterId, option) {
        if (!this.options.includes(option)) {
            throw { error: 'Invalid option.' };
        }
        this.votes.set(voterId, option);
    }
}
