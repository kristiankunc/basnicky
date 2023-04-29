import type { Album } from "$lib/types";
import { Database } from "./database";

export class AlbumDB extends Database {
    static async createAlbum(name: string, image: string): Promise<void> {
        await this.query("INSERT INTO albums (name, image) VALUES (?, ?)", [name, image]);
    }

    static async getAlbums(): Promise<Album[]> {
        return await this.query("SELECT * FROM albums");
    }

    static async getAlbum(id: string): Promise<Album | null> {
        let res = await this.query("SELECT * FROM albums WHERE id = ?", [id]);
        if(res.length == 0) {
            return null;
        }
        return res[0];
    }

    static async updateAlbum(id: string, name: string, image: string): Promise<void> {
        await this.query("UPDATE albums SET name = ?, image = ? WHERE id = ?", [name, image, id]);
    }

    static async deleteAlbum(id: string): Promise<void> {
        await this.query("DELETE FROM albums WHERE id = ?", [id]);
    }
}