import { useEffect, useState } from "react"

const useAdmin = email => {
    const [userRole, setUserRole] = useState('');  // initially no one is admin
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if(email){
            fetch(`https://used-product-resale-market-server-roan.vercel.app/users/role/${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUserRole(data);
                setIsAdminLoading(false)
            })
        }
    }, [email])

    return [userRole, isAdminLoading]
}

export default useAdmin;