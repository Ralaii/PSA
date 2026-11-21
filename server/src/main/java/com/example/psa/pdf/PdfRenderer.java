package com.example.psa.pdf;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.util.Map;


@Component
@RequiredArgsConstructor
public class PdfRenderer {
    private final TemplateEngine templateEngine;

    public byte[] render(String template, Map<String, Object> model) {
        Context ctx = new Context();
        ctx.setVariables(model);
        String html = templateEngine.process(template, ctx);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, null);
            builder.toStream(out);
            builder.run();
            return out.toByteArray();
        } catch (Exception e) {
            throw new IllegalStateException("Failed to render PDF", e);
        }
    }
}
