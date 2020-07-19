const toHHMMSS = (secs: number):{
    hours: string;
    minutes: string;
    seconds: string;
} =>{
    if (!secs) return { hours:undefined, minutes:undefined, seconds: undefined};
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs - hours * 3600) / 60);
    const seconds = secs - hours * 3600 - minutes * 60;
    return {
        hours: hours < 10 ? '0' + hours : hours.toString(),
        minutes: minutes < 10 ? '0' + minutes : minutes.toString(),
        seconds: seconds < 10 ? '0' + seconds : seconds.toString(),
    };
}

export {toHHMMSS}