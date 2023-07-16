import Shot from "./shot.js";
export default function Attack (data) {
    const shotResponce = Shot(data);
    return (
        JSON.stringify(shotResponce)
    );
}