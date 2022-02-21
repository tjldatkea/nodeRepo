export class Todo {
    id: number;
    title: string;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}

/*
export class Todo {
    //id: number;
    //title: string;

    // Noget med at man kan skrive public inden parameterne og så kan man springe erklæringerne over både oppe og i constructoren
    constructor(@public id: string, @public title: string) {
        //this.id = id;
        //this.title = title;
    }
}
*/