import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';

export const SUPPORTED_IMAGE_TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export class ImageValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ImageValidationError';
    }
}

/**
 * Validates an image file
 * @param {File} file - The file to validate
 * @throws {ImageValidationError} If validation fails
 */
export const validateImage = (file) => {
    if (!file) {
        throw new ImageValidationError('No file selected');
    }

    if (!SUPPORTED_IMAGE_TYPES[file.type]) {
        throw new ImageValidationError(
            `Unsupported file type. Please upload one of: ${Object.keys(
                SUPPORTED_IMAGE_TYPES
            ).join(', ')}`
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new ImageValidationError(
            'File size must be less than 5MB'
        );
    }
};

/**
 * Uploads an image to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The storage path (e.g., 'users')
 * @param {string} filename - The filename without extension
 * @returns {Promise<{downloadURL: string, filePath: string}>}
 */
export const uploadImage = async (file, path, filename) => {
    try {
        validateImage(file);

        const storage = getStorage();
        const fileExtension = SUPPORTED_IMAGE_TYPES[file.type];
        const filePath = `${path}/${filename}.${fileExtension}`;
        const storageRef = ref(storage, filePath);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        return {
            downloadURL,
            filePath,
        };
    } catch (error) {
        if (error instanceof ImageValidationError) {
            throw error;
        }
        throw new Error('Failed to upload image: ' + error.message);
    }
};

/**
 * Creates a file input change handler for image uploads
 * @param {Function} onSuccess - Callback function when upload succeeds
 * @param {Function} onError - Callback function when upload fails
 * @param {string} path - The storage path
 * @param {string} filename - The filename without extension
 * @param {Function} updateUserData - Function to update user data
 * @returns {Function} Event handler for file input change
 */
export const createImageUploadHandler = (
    onSuccess,
    onError,
    path,
    filename,
    updateUserData
) => {
    return async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const result = await uploadImage(file, path, filename);

            // Convert the uploaded file to base64 for caching
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = async () => {
                const base64data = reader.result;

                // Cache the new image
                localStorage.setItem(
                    'userImage',
                    JSON.stringify({
                        data: base64data,
                        timestamp: Date.now(),
                        url: result.filePath,
                    })
                );

                // Update user data with the new photo URL path
                await updateUserData({
                    photoURL: result.filePath,
                });
            };

            onSuccess(result);
        } catch (error) {
            onError(error);
        } finally {
            // Clear the input value to allow uploading the same file again
            event.target.value = '';
        }
    };
};
