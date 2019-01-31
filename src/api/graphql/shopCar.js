export const getShopCarByProps=`query userCartbyprops($user_id: ID) {
    userCartbyprops: userCart_by_props(user_id: $user_id) {
        id
        user_id {
            email
            updatedAt
            password
            telephone
            username
            createdAt
            openid
            id
        }
        product_id {
            category
            updatedAt
            unit
            name
            createdAt
            status
            id
            intro
            price
            img
            stock
        }
        count
        createdAt
        updatedAt
    }
}`

export const deleteCarByProps=`mutation deleteuserCart($id: ID, $user_id: ID, $product_id: ID, $count: Int, $createdAt: String, $updatedAt: String) {
    deleteuserCart: delete_userCart(id: $id user_id: $user_id product_id: $product_id count: $count createdAt: $createdAt updatedAt: $updatedAt)
}`

export const createShopCar=`mutation createuserCart($id: ID!, $user_id: ID, $product_id: ID, $count: Int, $createdAt: String, $updatedAt: String) {
    createuserCart: create_userCart(id: $id user_id: $user_id product_id: $product_id count: $count createdAt: $createdAt updatedAt: $updatedAt) {
        id
        count
        createdAt
        updatedAt
    }
}`