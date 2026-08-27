Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\ADMIN\.gemini\antigravity\brain\cf5db179-1e7f-4498-8451-7c826a6c8000\.user_uploaded\media_1787831311997.jpg"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

$outDir = "c:\Projects\trustedmedshop\public\images\products"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

function Crop-Image($x, $y, $w, $h, $name) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $dest = Join-Path $outDir "$name.jpg"
    $cropped.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved $dest ($w x $h)"
}

# 1. Main Fenbendazole
Crop-Image 28 116 252 218 "fenbendazole-main"

# 2. 4 Thumbnails
Crop-Image 28 345 58 48 "fenbendazole-thumb-1"
Crop-Image 92 345 58 48 "fenbendazole-thumb-2"
Crop-Image 156 345 58 48 "fenbendazole-thumb-3"
Crop-Image 220 345 58 48 "fenbendazole-thumb-4"

# 3. 4 Related Products
Crop-Image 36 740 130 50 "related-ivermectin"
Crop-Image 196 740 130 50 "related-albendazole"
Crop-Image 356 740 130 50 "related-mebendazole"
Crop-Image 516 740 130 50 "related-praziquantel"

$img.Dispose()
Write-Host "Product detail images cropped successfully!"
