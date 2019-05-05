module.exports = (res, status, result = '') => {
    let msg = '';
    if (status === '0') {
        msg = 'success'
    }
    else if (status === '1') {
        msg = 'fatal server inner error'
    }
    else if (status === '2') {
        msg = `Wrong Username or Password!`
    }
    else if (status === '3') {
        msg = 'not login'
    }
    else if (status === '4') {
        msg = 'cart edit error'
    }
    else if (status === '5') {
        msg = 'not have this order'
    }
    res.json({
        status,
        msg,
        result
    })
};