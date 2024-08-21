function calcLandmarkList(image: any, landmarks: any) {
  const imageWidth = image.videoWidth; // Lebar gambar dalam piksel
  const imageHeight = image.videoHeight; // Tinggi gambar dalam piksel

  const landmarkPoints: any = [];

  // Iterasi melalui setiap landmark
  landmarks.forEach((landmark: any) => {
    // Konversi koordinat relatif ke piksel
    const landmarkX = Math.min(
      Math.floor(landmark.x * imageWidth),
      imageWidth - 1
    );
    const landmarkY = Math.min(
      Math.floor(landmark.y * imageHeight),
      imageHeight - 1
    );

    // Tambahkan koordinat ke dalam daftar
    landmarkPoints.push([landmarkX, landmarkY]);
  });

  return landmarkPoints;
}

export default calcLandmarkList;
