const isValidDate = (value) => {
    return !isNaN(new Date(value).getTime());  
}

module.exports = {
    isValidDate
}