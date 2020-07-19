import mondaySdk from 'monday-sdk-js';
const initMonday = ()=>{
    try {
        return mondaySdk();
    }catch(e){
        console.error(e);
        return {
            api:()=>Promise.resolve([])
        }
    }
}

const monday = initMonday();

class Monday {
    getInstance(){
        return monday;
    }
    api(query: string){
        return monday.api(query).then((res:{data: any}) => res.data)
    }
    get(val:string) {
        return monday.get('context').then((res:{data: any}) => res.data);
    }
}

export {Monday};