export const updateCleaner = (data: any, key: string) => {
    const pk = data[key];
    delete data[key];
    return [pk,data]
}