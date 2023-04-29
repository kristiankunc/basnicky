import { PoemDB } from '$lib/database/poem.js';

export const load = async ({ params }) => {
    const poem = await PoemDB.getPoem(params.id);

    return poem
}