export const updateCleaner = (data: any, key: string) => {
    const pk = data[key];
    delete data[key];
    return [pk,data]
}

export const GetResponsePaginated = async (entity: any, data: any) =>{
    const totalSize = await entity.count()
    return {
        data,
        totalSize
    }
}