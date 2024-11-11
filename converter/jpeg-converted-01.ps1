# Define the ASCII characters to use based on brightness level
$asciiChars = " .:-=+*#%@"

#"@%#*+=-:. "  # Darker to lighter

# Load the image
$imagePath = "C:\temp\img\Image.jpg"
$outputPath = "C:\temp\img\output.txt"

# Load the image
Add-Type -AssemblyName System.Drawing
$image = [System.Drawing.Image]::FromFile($imagePath)

# Get the original image dimensions
$inputWidth = $image.Width
$inputHeight = $image.Height

# Adjust the height to account for ASCII character aspect ratio
# ASCII characters are taller than they are wide, so we reduce the height scaling factor
$aspectRatio = 0.5 # This can be fine-tuned for better results

# Adjusted height for ASCII output
$outputHeight = [math]::Ceiling($inputHeight * $aspectRatio)

# Create a bitmap for processing with adjusted dimensions
$bitmap = New-Object System.Drawing.Bitmap($image, $inputWidth, $outputHeight)

# Open output file
$outFile = New-Object System.IO.StreamWriter($outputPath)

# Convert each pixel to ASCII
for ($y = 0; $y -lt $bitmap.Height; $y++) {
    $line = ""
    for ($x = 0; $x -lt $bitmap.Width; $x++) {
        # Get the pixel color and convert to grayscale
        $pixelColor = $bitmap.GetPixel($x, $y)
        $grayValue = [math]::Round(($pixelColor.R * 0.3) + ($pixelColor.G * 0.59) + ($pixelColor.B * 0.11))

        # Map the grayscale value to an ASCII character
        $charIndex = [math]::Floor(($grayValue / 255) * ($asciiChars.Length - 1))
        $asciiChar = $asciiChars[$charIndex]

        # Add to the line
        $line += $asciiChar
    }
    # Write the line to the output file
    $outFile.WriteLine($line)
}

# Clean up
$outFile.Close()
$image.Dispose()
$bitmap.Dispose()

Write-Output "ASCII art saved to $outputPath"
