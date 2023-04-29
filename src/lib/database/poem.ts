import type { deletePoem } from "$lib/dashboard/delete";
import type { Poem } from "$lib/types";
import { Database } from "./database";

export class PoemDB extends Database {
    static async addPoem(name: string, author: string, text: string, albumId: string, explicit: number) {
        await this.query("INSERT INTO poems (name, author, text, albumId, explicit) VALUES (?, ?, ?, ?, ?)", [name, author, text, albumId, explicit]);
    }

    static async getPoems() {
        return await this.query("SELECT * FROM poems");
    }

    static async getPoem(poemId: string): Promise<Poem> {
        return (await this.query("SELECT * FROM poems WHERE id = ?", [poemId]))[0];
    }
    
    static async getPoemsAlbum(albumId: string): Promise<Poem[]> {
        return await this.query("SELECT * FROM poems WHERE albumId = ?", [albumId]);
    }

    static async deletePoem(poemId: string) {
        await this.query("DELETE FROM poems WHERE id = ?", [poemId]);
    }

    static async updatePoem(poemId: string, name: string, author: string, text: string, albumId: string, explicit: number) {
        await this.query("UPDATE poems SET name = ?, author = ?, text = ?, albumId = ?, explicit = ? WHERE id = ?", [name, author, text, albumId, explicit, poemId]);
    }
}
