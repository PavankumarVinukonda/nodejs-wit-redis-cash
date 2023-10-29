import user from "./users";


async function init() {
    await user.sync({alter:true})
}

const dbInit = () => {
    init()
}

export default dbInit;