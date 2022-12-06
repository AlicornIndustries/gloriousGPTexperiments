/*
SIL: Coded using chat.openai.com with minimal tweaks
Comments from me prefaced with ALI.
Prompts are prefaced with PRMT
Not prefaced if it's just moving ChatGPT's output from plain text to comment.
*/
// ALI: Rewrote to make it even-r, pointy top
var HexDirection;
(function (HexDirection) {
    HexDirection[HexDirection["East"] = 1] = "East";
    HexDirection[HexDirection["SouthEast"] = 2] = "SouthEast";
    HexDirection[HexDirection["SouthWest"] = 3] = "SouthWest";
    HexDirection[HexDirection["West"] = 4] = "West";
    HexDirection[HexDirection["NorthWest"] = 5] = "NorthWest";
    HexDirection[HexDirection["NorthEast"] = 6] = "NorthEast";
})(HexDirection || (HexDirection = {}));
var Hex = /** @class */ (function () {
    function Hex(q, r) {
        this.q = q;
        this.r = r;
        var key = this.getKey();
        if (!Hex.hexes[key]) {
            Hex.hexes[key] = this;
        }
    }
    // Returns the key for this hex, which is used to store it in the hexes map
    Hex.prototype.getKey = function () {
        return "".concat(this.q, ",").concat(this.r);
    };
    // Returns the neighboring hex in the specified direction
    Hex.prototype.neighbor = function (direction) {
        var q = this.q;
        var r = this.r;
        // ALI GPT got this wrong (it had a q++ r++)
        switch (direction) {
            case HexDirection.East:
                q++;
                break;
            case HexDirection.SouthEast:
                r++;
                break;
            case HexDirection.SouthWest:
                q--;
                r++;
                break;
            case HexDirection.West:
                q--;
                break;
            case HexDirection.NorthWest:
                q--;
                r--;
                break;
            case HexDirection.NorthEast:
                r--;
                break;
        }
        // Check if the hex already exists in the hexes map, and return it if it does
        var key = "".concat(q, ",").concat(r);
        if (Hex.hexes[key])
            return Hex.hexes[key];
        // Otherwise, create a new hex and add it to the map
        return new Hex(q, r);
    };
    // ALI wrote while GPT was down
    Hex.prototype.printInfo = function () {
        console.log("Coords ".concat(this.getKey()));
    };
    // Map that stores all the hex instances that have been created
    Hex.hexes = {};
    return Hex;
}());
// PRMT Write a function that generates a hex and its six neighbors.
function generateHexAndNeighbors(q, r) {
    var hex = new Hex(q, r);
    var hexes = [hex];
    // Generate the six neighbors of the hex
    for (var dir in HexDirection) {
        if (!isNaN(Number(dir))) {
            hexes.push(hex.neighbor(Number(dir)));
        }
    }
    return hexes;
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// ALI written while GPT was down
var hexes = generateHexAndNeighbors(3, 3);
console.log(hexes);
