export function getSettingsData() {
  return {
    profileImage: {
      type: "image",
      defaultValue: "https://example.com/default-profile-image.jpg",
      label: "Profile Picture"
    },
    formFields: [
      { label: "Your Name", defaultValue: "Charlene Reed", type: "text" },
      { label: "User Name", defaultValue: "Charlene Reed", type: "text" },
      { label: "Email", defaultValue: "charlenereed@gmail.com", type: "email" },
      { label: "Password", defaultValue: "********", type: "password" },
      { label: "Date of Birth", defaultValue: "25 January 1990", type: "text", hasDropdown: true },
      { label: "Present Address", defaultValue: "San Jose, California, USA", type: "text" },
      { label: "Permanent Address", defaultValue: "San Jose, California, USA", type: "text" },
      { label: "City", defaultValue: "San Jose", type: "text" },
      { label: "Postal Code", defaultValue: "45962", type: "text" },
      { label: "Country", defaultValue: "USA", type: "text" },
    ]
  };
}