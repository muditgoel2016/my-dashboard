export function getSettingsData() {
  return {
    profileImage: {
      type: "image",
      defaultValue: "https://example.com/default-profile-image.jpg",
      label: "Profile Picture"
    },
    formFields: [
      { label: "Your Name", defaultValue: "Charlene Reed", type: "text", name: "yourName" },
      { label: "User Name", defaultValue: "Charlene Reed", type: "text", name: "userName" },
      { label: "Email", defaultValue: "charlenereed@gmail.com", type: "email", name: "email" },
      { label: "Password", defaultValue: "********", type: "password", name: "password" },
      { label: "Date of Birth", defaultValue: "25 January 1990", type: "date", name: "dateOfBirth" },
      { label: "Present Address", defaultValue: "San Jose, California, USA", type: "text", name: "presentAddress" },
      { label: "Permanent Address", defaultValue: "San Jose, California, USA", type: "text", name: "permanentAddress" },
      { label: "City", defaultValue: "San Jose", type: "text", name: "city" },
      { label: "Postal Code", defaultValue: "45962", type: "text", name: "postalCode" },
      { label: "Country", defaultValue: "USA", type: "text", name: "country" },
    ]
  };
}