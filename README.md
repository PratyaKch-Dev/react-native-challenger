# Project Name

ChallengerApp

## Description

This project is a React Native application designed to manage user authentication, OTP verification, and financial transactions. The application includes features such as signing in with a phone number, verifying OTP, setting a passcode, viewing transaction history, and performing withdrawals.

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

   ```sh
   git clone https://github.com/PratyaKch-Dev/react-native-challenger.git
   cd react-native-challenger
   ```

2. Install dependencies:

   ```sh
   npm i --legacy-peer-deps
   ```

3. Install Pods (iOS only):

   ```sh
   cd ios
   rm -rf ~/Library/Caches/CocoaPods
   rm -rf Pods
   rm -rf ~/Library/Developer/Xcode/DerivedData/*
   pod deintegrate
   pod setup
   pod install
   cd ..

   For M1
   cd ios
   rm -rf ~/Library/Caches/CocoaPods
   rm -rf Pods
   rm -rf ~/Library/Developer/Xcode/DerivedData/*
   pod deintegrate
   pod setup
   arch -x86_64 pod install
   cd ..
   ```

4. Reset Watchman Cache:
   ```sh
   watchman watch-del-all
   rm -rf $TMPDIR/react-*
   rm -rf $TMPDIR/haste-*
   rm -rf $TMPDIR/metro-*
   npm start -- --reset-cache
   ```

## Running the Application

To start the application, run:

```sh
npx react-native run android
# or
npx react-native run ios
```

## Features

```sh
Sign In

- Phone Number Input: Users can enter their phone number to sign in.
- OTP Verification: After entering the phone number, users receive an OTP to verify. Note that the OTP is mock data and is always 1234 for testing purposes.

Passcode Setup

- Set Passcode: Users can set a passcode for additional security.
- Enter Passcode: Users must confirm the passcode to access certain features.

Transaction Management

- View Profile: Users can view their profile including first name and last name.
- View Balance and History: Users can view their available balance and transaction history.
- Withdraw Funds: Users can initiate withdrawals to their bank accounts.

Settings

- Settings Screen: Users can reset their PIN or log out.

Re-Authentication
- Token Management: If the user's token has not yet expired, users can use the application again by entering your passcode. If the token expires, the user must re-authenticate using their phone number and OTP.

```
