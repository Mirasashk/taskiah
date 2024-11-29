const {
    addUser,
    getUser,
    updateUser,
} = require('../../controllers/userController');
const { db, auth } = require('../../config/firebase');

jest.mock('firebase-admin', () => {
    const updateUserMock = jest.fn().mockResolvedValue({});
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(() => ({
            updateUser: updateUserMock,
        })),
    };
});

jest.mock('../../config/firebase', () => {
    const updateMock = jest.fn().mockResolvedValue({});
    const getMock = jest.fn().mockResolvedValue({
        data: () => ({ id: '123', name: 'Test User' }),
        exists: true,
    });
    const docRef = {
        set: jest.fn().mockResolvedValue({}),
        get: getMock,
        update: updateMock,
    };
    const docMock = jest.fn(() => docRef);

    return {
        db: {
            collection: jest.fn(() => ({
                doc: docMock,
            })),
        },
        auth: jest.fn(() => ({
            updateUser: jest.fn().mockResolvedValue({}),
        })),
    };
});

jest.mock('../../models/userModel', () => {
    const mockValidate = jest.fn();
    const MockUserModel = jest.fn().mockImplementation(() => ({
        toJSON: jest
            .fn()
            .mockReturnValue({ id: '123', name: 'Test User' }),
        validate: mockValidate,
    }));
    MockUserModel.mockValidate = mockValidate;
    return MockUserModel;
});

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addUser', () => {
        it('should add a user to the database', async () => {
            const user = { id: '123', name: 'Test User' };
            const UserModel = require('../../models/userModel');

            await addUser(user);

            expect(UserModel.mockValidate).toHaveBeenCalled();
            expect(db.collection).toHaveBeenCalledWith('users');
            expect(db.collection().doc).toHaveBeenCalledWith(user.id);
        });
    });

    describe('getUser', () => {
        it('should retrieve a user from the database', async () => {
            const userId = '123';
            const userData = { id: userId, name: 'Test User' };

            db.collection()
                .doc()
                .get.mockResolvedValue({
                    data: () => userData,
                });

            const result = await getUser(userId);

            expect(db.collection).toHaveBeenCalledWith('users');
            expect(db.collection().doc).toHaveBeenCalledWith(userId);
            expect(result).toEqual(userData);
        });
    });

    describe('updateUser', () => {
        it('should update a user in the database', async () => {
            const { auth } = require('firebase-admin');

            const userId = '123';
            const user = {
                email: 'test@example.com',
                name: 'Updated User',
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            db.collection()
                .doc()
                .get.mockResolvedValue({
                    exists: true,
                    id: userId,
                    data: () => ({ ...user, id: userId }),
                });

            await updateUser(userId, user, res);

            expect(auth().updateUser).toHaveBeenCalledWith(userId, {
                email: user.email,
            });
            expect(db.collection).toHaveBeenCalledWith('users');
            expect(db.collection().doc).toHaveBeenCalledWith(userId);
            expect(db.collection().doc().update).toHaveBeenCalledWith(
                {
                    ...user,
                    updatedAt: expect.any(Date),
                }
            );
            expect(res.json).toHaveBeenCalledWith({
                id: userId,
                ...user,
            });
        });

        it('should return 404 if user does not exist', async () => {
            const userId = '123';
            const user = {
                email: 'test@example.com',
                name: 'Updated User',
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            db.collection()
                .doc()
                .get.mockResolvedValue({ exists: false });

            await updateUser(userId, user, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: 'User not found',
            });
        });
    });
});
