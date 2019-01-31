export const getAddressByProps =`query userAddressbyprops($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $user_id: ID, $area: String, $province: String) {
    userAddressbyprops: userAddress_by_props(address: $address updatedAt: $updatedAt telephone: $telephone
        default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt user_id: $user_id area: $area province: $province) {
        address
        updatedAt
        telephone
        default
        city
        username
        postcode
        createdAt
        deletedAt
        id
        area
        province
    }
}`

export const createAddress=`mutation createuserAddress($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $id: ID!, $user_id: ID, $area: String, $province: String) {
    createuserAddress: create_userAddress(address: $address updatedAt: $updatedAt telephone: $telephone
        default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt id: $id user_id: $user_id area: $area province: $province) {
        address
        updatedAt
        telephone
        default
        city
        username
        postcode
        createdAt
        deletedAt
        id
        area
        province
    }
}`

    export const updateAddress=`mutation updateuserAddress($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $id: ID, $user_id: ID, $area: String, $province: String) {
        updateuserAddress: update_userAddress(address: $address updatedAt: $updatedAt telephone: $telephone
            default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt id: $id user_id: $user_id area: $area province: $province) {
            address
            updatedAt
            telephone
            default
            city
            username
            postcode
            createdAt
            deletedAt
            id
            area
            province
        }
    }`

    export const getAddressById=`query userAddressbyid($id: ID) {
        userAddressbyid: userAddress_by_id(id: $id) {
            address
            updatedAt
            telephone
            default
            city
            username
            postcode
            createdAt
            deletedAt
            id
            area
            province
        }
    }`