export const getUserByProps=`query userbyprops($openid: String, $username: String, $password: String, $telephone: String, $email: String, $userData_id: ID, $createdAt: String, $updatedAt: String) {
    userbyprops: user_by_props(openid: $openid username: $username password: $password telephone: $telephone email: $email userData_id: $userData_id createdAt: $createdAt updatedAt: $updatedAt) {
        email
        updatedAt
        password
        telephone
        username
        createdAt
        openid
        id
    }
}`