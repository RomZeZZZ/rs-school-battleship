export default function CreateField () {
    const rows = 10;
    const cols = 10;
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = Array(cols).fill(0);
        matrix.push(row);
    }
    return matrix;
}