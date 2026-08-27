Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\ADMIN\.gemini\antigravity\brain\cf5db179-1e7f-4498-8451-7c826a6c8000\.user_uploaded\media_1787829930111.png"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

$outDir = "c:\Projects\trustedmedshop\public\images\mockup"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

function Crop-Image($x, $y, $w, $h, $name) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $dest = Join-Path $outDir "$name.png"
    $cropped.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Saved $dest ($w x $h)"
}

# 1. Hero Graphic (Right side of Hero Banner)
# Hero starts around Y=75 and goes to Y=240, X goes from 150 to 425
Crop-Image 140 70 280 175 "hero-graphic"

# 2. Popular Medicines (5 items)
# Row 1 Product Images
Crop-Image 12 330 80 48 "pop-1-imatinib"
Crop-Image 94 330 80 48 "pop-2-sofosbuvir"
Crop-Image 176 330 80 48 "pop-3-lenalidomide"
Crop-Image 258 330 80 48 "pop-4-apixaban"
Crop-Image 340 330 80 48 "pop-5-daclatasvir"

# 3. Top Selling Products (5 items)
# Row 2 Product Images
Crop-Image 12 480 80 48 "top-1-tadalafil"
Crop-Image 94 480 80 48 "top-2-sildenafil"
Crop-Image 176 480 80 48 "top-3-metformin"
Crop-Image 258 480 80 48 "top-4-omeprazole"
Crop-Image 340 480 80 48 "top-5-amlodipine"

# 4. Best Offers Products (5 items)
# Row 3 Product Images
Crop-Image 12 626 80 48 "offer-1-everolimus"
Crop-Image 94 626 80 48 "offer-2-dasatinib"
Crop-Image 176 626 80 48 "offer-3-rivaroxaban"
Crop-Image 258 626 80 48 "offer-4-enzalutamide"
Crop-Image 340 626 80 48 "offer-5-semaglutide"

$img.Dispose()
Write-Host "All mockup images cropped successfully!"
