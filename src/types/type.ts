export  type Ing={
    amount:any,
    title:string,
    id:string
}

export type IN ={
    amount:any,
    title:string,
}

export type Items={
    items:Ing[]
}

export type ARG={
    type:'ADD ITEMS',
    itms:Items
}

export type INST={
items:Ing[],
loading:boolean,
error:any
}

export type DispatchItm = (arg:ARG)=>(ARG)