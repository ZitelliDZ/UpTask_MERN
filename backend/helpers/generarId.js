const generarId = () =>{
    const date = Date.now().toString(32);
    const random =  Math.random().toString(32).substring(2);
    return random + date;
}

export { generarId }

export default generarId;