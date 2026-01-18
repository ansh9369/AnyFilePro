import unittest
import os
from PIL import Image
from backend.services.converter import ConverterService
from backend.core.config import settings

class TestConverter(unittest.TestCase):
    def setUp(self):
        os.makedirs(settings.TEMP_DIR, exist_ok=True)
        self.img1_path = os.path.join(settings.TEMP_DIR, "test1.png")
        self.img2_path = os.path.join(settings.TEMP_DIR, "test2.png")

        # Create dummy images
        img1 = Image.new('RGB', (100, 100), color = 'red')
        img1.save(self.img1_path)
        img2 = Image.new('RGB', (100, 100), color = 'blue')
        img2.save(self.img2_path)

    def tearDown(self):
        # Cleanup
        if os.path.exists(self.img1_path):
            os.remove(self.img1_path)
        if os.path.exists(self.img2_path):
            os.remove(self.img2_path)

    def test_images_to_pdf(self):
        output_name = "test_output.pdf"
        result_path = ConverterService.images_to_pdf([self.img1_path, self.img2_path], output_name)

        self.assertTrue(os.path.exists(result_path))
        self.assertTrue(result_path.endswith(".pdf"))

        # Clean up result
        if os.path.exists(result_path):
            os.remove(result_path)

if __name__ == '__main__':
    unittest.main()
