module.exports = (res, status, result = '') => {
    let msg = '';
    if (status === '0') {
        msg: 'success'
    }
    else if (status === '1') {
        msg: 'fatal error'
    }
    else if (status === '2') {
        msg: `can't find the user`
    }
    else if (status === '3') {
        msg: 'not login'
    }
    else if (status === '4') {
        msg: 'cart edit error'
    }
    res.json({
        status,
        msg,
        result
    })
};