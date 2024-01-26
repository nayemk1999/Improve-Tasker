export const getNextId = (data) => {
    if (data.length) {
        const maxId = data?.reduce((prev, current) =>
        prev && prev.id > current.id ? prev.id : current.id
    );

    return maxId + 1;
    } else {
        return 1;
    }
    
};