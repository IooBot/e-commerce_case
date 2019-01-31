export const getOrderByProps=`query orderbyprops($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
    orderbyprops: order_by_props(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
        deliveryTime
        updatedAt
        payTime
        orderTotalPay
        createdAt
        orderStatus
        userAddress_id {
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
        id
        orderShipFee
        count
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
        productTotalPay
        orderPay_id {
            id


            totalPay
            transactionId
            payTime
        }
    }
}`

export const getProductByProps=`query orderProductbyprops($remark: String, $updatedAt: String, $product_id: ID, $orderPay: Float, $createdAt: String, $order_id: ID, $count: Int, $productPay: Float, $user_id: ID) {
    orderProductbyprops: orderProduct_by_props(remark: $remark updatedAt: $updatedAt product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id count: $count productPay: $productPay user_id: $user_id) {
        remark
        updatedAt
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
        orderPay
        createdAt
        id
        count
        productPay
    }
}`

export const createOrders=`mutation createorder($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID!, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
    createorder: create_order(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
        deliveryTime
        updatedAt
        orderLogistics_id {
            updatedAt
            logisticsFee
            expressId
            createdAt
            consigneeTel
            id
            consignAddress
            LogisticsStatus
            consigneeName
        }
        payTime
        orderTotalPay
        createdAt
        orderStatus
        userAddress_id {
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
        id
        orderShipFee
        count
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
        productTotalPay
        orderPay_id {
            id
            totalPay
            transactionId
            payTime
        }
    }
}`


export const createOrderProducts=`mutation createorderProduct($remark: String, $updatedAt: String, $unit: Int, $product_id: ID, $orderPay: Float, $createdAt: String, $order_id: ID, $id: ID!, $count: Int, $productPay: Float, $user_id: ID) {
    createorderProduct: create_orderProduct(remark: $remark updatedAt: $updatedAt unit: $unit product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id id: $id count: $count productPay: $productPay user_id: $user_id) {
        remark
        updatedAt
        unit
      
        orderPay
        createdAt
        id
        count
        productPay
    }
}`

export const DELETE_ORDER=`mutation deleteorder($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
    deleteorder: delete_order(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id)
}`

export const DELETE_ORDER_PRODUCT=`mutation deleteorderProduct($remark: String, $updatedAt: String, $product_id: ID, $orderPay: Float, $createdAt: String, $order_id: ID, $id: ID, $count: Int, $productPay: Float, $user_id: ID) {
    deleteorderProduct: delete_orderProduct(remark: $remark updatedAt: $updatedAt product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id id: $id count: $count productPay: $productPay user_id: $user_id)
}`