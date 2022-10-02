import { extendType } from "@nexus/schema";
import { authHelper, error } from "../../../utils";
import { LooseObject, Avatar } from "../../../interfaces";
import { CountryHelper } from "../../../utils";
import { authenticateUser } from "../../../utils/auth.helper";
import { ObjectId } from "bson";
import imageClient from "../../../../server/imageClient";

export const CreateUserMutation = extendType({
  type: "Mutation",
  definition: (table) => {
    // Create User
    table.field("createUser", {
      type: "User",
      args: {
        user: "userInputType",
      },
      resolve: async (root, args, ctx) => {
        authenticateUser(ctx.user);

        const email = args.user?.email.trim().toLowerCase();
        const firstName = args.user?.firstName.trim();
        const lastName = args.user?.lastName.trim();
        const role = args.user?.role;
        const gender = args.user?.gender;
        const address = args.user?.address ?? "";
        const password = args.user?.password;
        const profileImage = args.user?.profileImage ?? "";

        if (!email || !password || !firstName || !lastName || !gender) {
          throw error.createError(
            error.ErrorCode.INCORRECT_ARGUMENTS,
            `Incorrect arguments passed`
          );
        }

        // Valid email
        if (!authHelper.validateEmail(email as string)) {
          throw error.createError(error.ErrorCode.VALIDATION_FAILED, [
            `${email} is not valid email id`,
          ]);
        }

        // User not present
        const existingUser = await ctx.db.User.findUnique({
          where: { email: email },
        });

        if (existingUser) {
          throw error.createError(error.ErrorCode.EMAIL_ALREADY_IN_USE, [
            email,
          ]);
        }

        const hashedPassword = await authHelper.hashPassword(password);

        const userDataModel: LooseObject = {
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          role: role,
          gender: gender,
        };

        // Handle profile image
        if (profileImage) {
          if (!imageClient.isBase64Image(profileImage)) {
            throw error.createError(
              error.ErrorCode.INCORRECT_ARGUMENTS,
              `The profile image provided is not in the correct format`
            );
          }

          let avatarDetails: {
            key: string;
            location: string;
            image: string;
          } | null = null;

          const key = new ObjectId().toHexString();
          const location = imageClient.getImageURL(key, profileImage);
          avatarDetails = { key: key, location: location, image: profileImage };

          // upload images to server.
          try {
            if (avatarDetails) {
              imageClient.uploadImage(avatarDetails.key, avatarDetails.image);
              userDataModel.avatar = {
                key: avatarDetails?.key,
                url: avatarDetails?.location,
              };
            }
          } catch {
            throw error.createError(
              error.ErrorCode.DATABASE_ERROR,
              "There was an error in adding images to the server."
            );
          }
        }

        // Handle address
        if (address && address?.countryCode) {
          const countryHelper = new CountryHelper();
          const country = await countryHelper.getCountryByCode(
            address.countryCode
          );

          if (!(country && country.cities.includes(address?.city))) {
            throw error.createError(
              error.ErrorCode.INCORRECT_ARGUMENTS,
              ` ${address?.city}is not valid input.`
            );
          }
          if (address?.city && country) {
            userDataModel.address = {
              create: {
                country: country.name,
                countryCode2Alpha: country.countryCode2Alpha,
                city: address.city,
                postalCode: address.postalCode,
              },
            };
          }
        }

        try {
          return await ctx.db.User.create({
            data: userDataModel,
            include: {
              address: true,
            },
          });
        } catch {
          throw error.createError(
            error.ErrorCode.DATABASE_ERROR,
            "There was an error creating the user."
          );
        }
      },
    });
  },
});
