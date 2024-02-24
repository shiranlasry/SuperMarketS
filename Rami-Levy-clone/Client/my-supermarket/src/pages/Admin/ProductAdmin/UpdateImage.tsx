import React, { useEffect, useState } from "react";
import { deleteSingleImageAPI } from "../../../features/api/imagesAPI";
import { useAppDispatch } from "../../../app/hook";
import { updateProductImages } from "../../../features/api/productsAPI";


interface UpdateImageProps {
    product_img_name_a: string | undefined;
    product_img_data_a: string | undefined;
    product_img_name_b: string | undefined;
    product_img_data_b: string | undefined;
    product_id: number | null;
    onClose: () => void;
}
    
const UpdateImage: React.FC<UpdateImageProps> = ({ product_id, product_img_data_a, product_img_data_b, product_img_name_a, product_img_name_b, onClose }) => {
    const [imageAData, setImageAData] = useState<string>(product_img_data_a || "");
    const [imageBData, setImageBData] = useState<string>(product_img_data_b || "");
    const [imageAName, setImageAName] = useState<string>(product_img_name_a || "");
    const [imageBName, setImageBName] = useState<string>(product_img_name_b || "");
    const [newImageA, setNewImageA] = useState<string>();
    const [newImageB, setNewImageB] = useState<string>();


    useEffect(() => {
        setImageAData(base64Image(product_img_data_a));
        console.log("product_img_data_a", product_img_data_a);
        setImageBData(base64Image(product_img_data_b));
        console.log("product_img_data_b", product_img_data_b);
            
    },[]);
        

    const base64Image = (product_img_data:any) => {
        if (product_img_data !== null && product_img_data !== undefined) {
            return btoa(
                String.fromCharCode(...new Uint8Array(product_img_data.data))
            );
        }
        return "";
    }

    const dispatch = useAppDispatch();
    const handleUpdateImage = (isA:boolean) => {
        isA ?
            dispatch(updateProductImages({ product_id, product_img_data_a: imageAData, product_img_data_b: null, product_img_name_a: imageAName, product_img_name_b: null }))
            :
            dispatch(updateProductImages({ product_id, product_img_data_a: null, product_img_data_b: imageBData, product_img_name_a: null, product_img_name_b: imageBName }));
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
        if (files) {
            const file = files[0];
            console.log("file:", file);
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = reader.result as string;
                const formData = new FormData();
                formData.append("product_id", product_id ? product_id.toString() : "");
                formData.append("imagesProduct", file); // Append the base64 string of the file
                console.log("formData:", formData.getAll("imagesProduct"));
                console.log("image:", fileData);
                // Log formData keys and values
                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
    
                const fileURL = URL.createObjectURL(file);
                if (isA) {
                    console.log("Set A")
                    setNewImageA(fileURL);
                    setImageAData(fileData); // Set base64 string as image data
                    setImageAName(file.name);
                } else {
                    console.log("Set B")
                    setNewImageB(fileURL);
                    setImageBData(fileData); // Set base64 string as image data
                    setImageBName(file.name);
                }
            };
            reader.readAsDataURL(file); // Convert file to base64 string
        }
    }
    
    
    return (
        <div>
            <h1>עדכן תמונות</h1>
            <div>
                    <div className="productImage">
                    <label htmlFor="imagesProduct1">תמונה 1</label>
                    {newImageA ?
                        <img src={newImageA} alt={imageAName || ""} />
                        :
                        <img src={`data:image/jpeg;base64, ${imageAData}`} alt={imageAName || ""} />
                    }
            
                        <input
                            type="file"
                            id="imagesProduct1"
                            name="imagesProduct1"
                            onChange={handleFileChange}
                        />
                        <button onClick={() => handleUpdateImage(true)}>עדכן תמונה</button>
                        <button onClick={handleDeleteImageA}>מחק תמונה</button>
                    </div>
                <div className="productImage">
                    <label htmlFor="imagesProduct2">תמונה 2</label>
                    {newImageB ? 
                        <img src={newImageB} alt={imageBName || ""} />
                        :
                        <img src={`data:image/jpeg;base64,${imageBData}`} alt={imageBName || ""} />
                    }
                        <input
                            type="file"
                            id="imagesProduct2"
                            name="imagesProduct2"
                            onChange={handleFileChange}
                        />
                        <button onClick={() => handleUpdateImage(false)}>עדכן תמונה</button>
                        <button onClick={handleDeleteImageB}>מחק תמונה</button>
                    </div>
                    <button onClick={onClose}>סגור</button>
            </div>
        </div>
    )
}

export default UpdateImage;
