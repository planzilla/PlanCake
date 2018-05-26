const nameFormat = (userData) => (`${userData.firstName.slice(0,1).toUpperCase()}${userData.firstName.slice(1).toLowerCase()} ${userData.lastName.slice(0,1).toUpperCase()}.`);

export default nameFormat;