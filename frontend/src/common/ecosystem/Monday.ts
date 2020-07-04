import * as mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

class Monday {
    getInstance(){
        return monday;
    }
    api(query: string){
        return monday.api(query).then((res:{data: any}) => res.data)
    }
}

export {Monday};