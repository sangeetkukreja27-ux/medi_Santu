Add-Type -AssemblyName System.Drawing

function Create-Favicon($path, $size) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::Transparent)

    # 1. Draw rounded green background badge
    $greenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 168, 107)) # #00A86B
    
    # Fill background circle / rounded rect
    $g.FillEllipse($greenBrush, 2, 2, $size - 4, $size - 4)

    # 2. Draw white medical cross
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    
    $mid = $size / 2
    $armThick = [Math]::Max(4, [int]($size * 0.22))
    $armLength = [Math]::Max(8, [int]($size * 0.60))
    $halfThick = $armThick / 2
    $halfLen = $armLength / 2

    # Vertical bar
    $g.FillRectangle($whiteBrush, [float]($mid - $halfThick), [float]($mid - $halfLen), [float]$armThick, [float]$armLength)
    # Horizontal bar
    $g.FillRectangle($whiteBrush, [float]($mid - $halfLen), [float]($mid - $halfThick), [float]$armLength, [float]$armThick)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created favicon at $path ($size x $size)"
}

Create-Favicon "c:\Projects\trustedmedshop\public\favicon.ico" 64
Create-Favicon "c:\Projects\trustedmedshop\src\app\favicon.ico" 64
Create-Favicon "c:\Projects\trustedmedshop\src\app\icon.png" 64
Create-Favicon "c:\Projects\trustedmedshop\src\app\apple-icon.png" 180
Create-Favicon "c:\Projects\trustedmedshop\public\logo-icon.png" 64
