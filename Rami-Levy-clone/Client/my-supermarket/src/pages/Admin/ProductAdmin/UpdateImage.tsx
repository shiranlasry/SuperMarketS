import React, { useEffect, useState } from "react";
import { deleteSingleImageAPI } from "../../../features/api/imagesAPI";
import { useAppDispatch } from "../../../app/hook";
import { string } from "prop-types";

interface UpdateImageProps {
    product_img_name_a: string | undefined;
    product_img_data_a: string | undefined;
    product_img_name_b: string | undefined;
    product_img_data_b: string | undefined;
    product_id: number | null;
    onClose: () => void;
}
    
const UpdateImage: React.FC<UpdateImageProps> = ({ product_id, product_img_data_a, product_img_data_b, product_img_name_a, product_img_name_b, onClose }) => {
    const [imageAData, setImageAData] = useState(product_img_data_a);
    const [imageBData, setImageBData] = useState(product_img_data_b);
    const [imageAName, setImageAName] = useState(product_img_name_a);
    const [imageBName, setImageBName] = useState(product_img_name_b);
    

    useEffect(() => {
        setImageAData(base64Image(product_img_data_a));
        console.log("Image A Data:", imageAData);
        setImageBData(base64Image(product_img_data_b));
        console.log("Image B Data:", imageBData);
    },[]);
        


    const base64Image = (product_img_data:any) => {
        if (product_img_data !== null && product_img_data !== undefined) {
            console.log("Product Image Data:", product_img_data);
            return btoa(
                String.fromCharCode(...new Uint8Array(product_img_data.data))
            );
        }
        return "";
    }

    const dispatch = useAppDispatch();
    const handleUpdateImageA = () => {
        // Implement update logic for image A
    };

    const handleUpdateImageB = () => {
        // Implement update logic for image B
    };

    const handleDeleteImageA = () => {
        dispatch(deleteSingleImageAPI({product_id, isA:true} ));
    };
    

    const handleDeleteImageB = () => {
        // Implement delete logic for image B
        dispatch(deleteSingleImageAPI({ product_id, isA:false}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const isA = e.target.name === "imagesProduct1" ? true : false;
        if (files)
        {   
            if (isA)
            {
                console.log("Image A:",  URL.createObjectURL(files[0]));
                setImageAData(base64Image(files[0]));
                setImageAName(files[0].name);
            }
            else
            {
                setImageBData(base64Image(files[0]));
                setImageBName(files[0].name);
            }
        }
    }
    
    return (
        <div>
            <h1>עדכן תמונות</h1>
            <div>
                    <div className="productImage">
                    <label htmlFor="imagesProduct1">תמונה 1</label>
                    <img src={`data:image/jpeg;base64,${imageAData}`} alt={imageAName || ""} />
                        <input
                            type="file"
                            id="imagesProduct1"
                            name="imagesProduct1"
                            onChange={handleFileChange}
                        />
                        <button onClick={handleUpdateImageA}>עדכן תמונה</button>
                        <button onClick={handleDeleteImageA}>מחק תמונה</button>
                    </div>
                <div className="productImage">
                        <label htmlFor="imagesProduct2">תמונה 2</label>
                        <img src={`data:image/jpeg;base64,${imageBData}`} alt={imageBName || ""} />
                        <input
                            type="file"
                            id="imagesProduct2"
                            name="imagesProduct2"
                            onChange={handleFileChange}
                        />
                        <button onClick={handleUpdateImageB}>עדכן תמונה</button>
                        <button onClick={handleDeleteImageB}>מחק תמונה</button>
                    </div>
                    <button onClick={onClose}>סגור</button>
            </div>
        </div>
    )
}

export default UpdateImage;
