const sendServerResponse = (res, msg, status) => {
    return res.json({
        message: msg,
        status: status
    })
}

const sendAuthResponse = (res, msg, status) => {
    console.log(msg, status);
    return res.json({
        message: msg,
        status: status
    })
}

const swndError = (res) => {
    return res.json(error)
}

module.exports = { sendServerResponse, sendAuthResponse }
