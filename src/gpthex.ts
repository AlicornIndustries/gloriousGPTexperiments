/*
SIL: Coded using chat.openai.com with minimal tweaks
Comments from me prefaced with ALI. 
Prompts are prefaced with PRMT
Not prefaced if it's just moving ChatGPT's output from plain text to comment.
*/

// ALI: Rewrote to make it even-r, pointy top
enum HexDirection {
    East = 1,
    SouthEast = 2,
    SouthWest = 3,
    West = 4,
    NorthWest = 5,
    NorthEast = 6
}


class Hex {
    // Map that stores all the hex instances that have been created
    public static hexes: { [key: string]: Hex } = {};

    constructor(public q: number, public r: number) {
        const key = this.getKey();
        if (!Hex.hexes[key]) {
            Hex.hexes[key] = this;
        }
    }

    // Returns the key for this hex, which is used to store it in the hexes map
    private getKey(): string {
        return `${this.q},${this.r}`;
    }

    // Returns the neighboring hex in the specified direction
    public neighbor(direction: HexDirection): Hex {

        let q = this.q;
        let r = this.r;
        // ALI GPT got this wrong (it had a q++ r++)
        switch (direction) {
            case HexDirection.East: q++; break;
            case HexDirection.SouthEast: r++; break;
            case HexDirection.SouthWest: q--; r++; break;
            case HexDirection.West: q--; break;
            case HexDirection.NorthWest: q--; r--; break;
            case HexDirection.NorthEast: r--; break;
        }

        // Check if the hex already exists in the hexes map, and return it if it does
        const key = `${q},${r}`;
        if (Hex.hexes[key]) return Hex.hexes[key];

        // Otherwise, create a new hex and add it to the map
        return new Hex(q, r);
    }

    // ALI wrote while GPT was down
    public printInfo() {
        console.log(`Coords ${this.getKey()}`)
    }
}

// PRMT Write a function that generates a hex and its six neighbors.
function generateHexAndNeighbors(q: number, r: number): Hex[] {
    const hex = new Hex(q, r);
    const hexes: Hex[] = [hex];
  
    // Generate the six neighbors of the hex
    for (const dir in HexDirection) {
        if (!isNaN(Number(dir))) {
            hexes.push(hex.neighbor(Number(dir)));
        }
    }
  
    return hexes;
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// ALI written while GPT was down
let hexes = generateHexAndNeighbors(3,3);
console.log(hexes);